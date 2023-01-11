const cloudinary = require("cloudinary");
const fs = require('fs');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadFiles = async (req, res) => {
    try {
        const { path } = req.body;
        let files = Object.values(req.files).flat();
        let filesTmp = [];
        for (const file of files) {
            const url = await uploadToCloudinary(file, path);
            filesTmp.push(url);
            removeTmp(file.tempFilePath);
        }
        res.json(filesTmp);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.listImages = async (req, res) => {
    const { path, sort, max } = req.body;

    cloudinary.v2.search
        .expression(`${path}`)
        .sort_by("created_at", `${sort}`)
        .max_results(max)
        .execute()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err.error.message);
        });
};

const uploadToCloudinary = async (file, path) => {
    return new Promise((resolve) => {
        cloudinary.v2.uploader.upload(
            file.tempFilePath,
            {
                transformation: {
                    width: 1280,
                    height: 720,
                    // crop: "fit",
                    // gravity: "auto",
                },
                responsive_breakpoints: {
                    create_derived: true,
                    max_width: 640,
                    max_images: 3,
                },
                folder: path,
            },
            (err, res) => {
                if (err) {
                    removeTmp(file.tempFilePath);
                    return res.status(400).json({ message: "Upload file failed." });
                }
                resolve({
                    url: res.secure_url,
                });
            }
        );
    });
};

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};