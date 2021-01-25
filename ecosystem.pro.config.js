module.exports = {
    "apps": [
        {
            "name": "Document",
            "script": "./server/app.js",
            "watch": ["server"],
            "ignore_watch": ["logs", "node_modules"],
            "env": {
                "NODE_ENV": "production",
            },
            "log_date_format": "YYYY-MM-DD HH:mm:ss",
            "error_file": "./logs/pm2.err",
            "out_file": "./logs/pm2.log"

        }
    ]

};
