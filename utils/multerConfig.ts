// import multer from 'multer';

//     const storage = multer.diskStorage({

//         destination: function (req, file, cb) {
//             cb(null, './uploads/');
//         },
//         filename: function (req, file, cb) {
//             const date = new Date().toISOString().replace(/:/g, './upload/');
//             cb(null, date + file.originalname);
//         }
//     });
    
//     const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true); // Pas d'erreur, accepter le fichier
//         } else {
//             cb(null, false); // Pas d'erreur, mais rejeter le fichier
//         }
//     };
    
//     const upload = multer({
//         storage: storage,
//         fileFilter: fileFilter,
//         limits: {
//             fileSize: 5 * 1024 * 1024
//         }

// });

// export default upload;








// import multer from 'multer';

// // Configuration du stockage des fichiers sur le disque
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         const date = new Date().toISOString().replace(/:/g, '-');
//         cb(null, date + file.originalname);
//     }
// });

// // Filtre pour n'accepter que les images
// const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 5 * 1024 * 1024
//     }
// });

// export default upload;




//import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log("Setting destination for file upload");
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         console.log("Setting filename for file upload");
//         const date = new Date().toISOString().replace(/:/g, '-');
//         cb(null, date + file.originalname);
//     }
// });

// const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
//     console.log("Checking file type:", file.mimetype);
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// const upload = multer({

//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 5 * 1024 * 1024
//     }

// });

// export default upload;


import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Vérifiez si le dossier d'upload existe, sinon créez-le
const uploadDirectory = './uploads/';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Req.body avant traitement multer:", req.body);
        console.log("Setting destination for file upload");
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const date = new Date().toISOString().replace(/:/g, '-');
        const generatedFilename = date + '-' + file.originalname;
        console.log("Generated filename:", generatedFilename);
        cb(null, generatedFilename);
    }
});

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
    console.log("Checking file type:", file.mimetype);
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 Mo
    }
});

export default upload;