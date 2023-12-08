// export async function DELETE(req: NextRequest) {
//     try {
//         // Vérification REQ Methode DELETE
//         if (req.method !== 'DELETE') {
//             return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//         }

//         // Connexion à la base de données
//         await connectToDB();

//         // Supprimer toutes les photos
//         await Photo.deleteMany({});

//         // Si vous stockez les images sur le serveur, vous devrez également les supprimer.
//         // Vous pouvez utiliser le module 'fs' pour cela.
//         // Par exemple, vous pouvez parcourir le répertoire des images et supprimer chaque fichier.

//         return NextResponse.json({ message: 'Toutes les photos ont été supprimées avec succès' });
//     } catch (error) {
//         console.error("Erreur lors de la suppression de toutes les photos:", error);
//         return NextResponse.json({ error: `Erreur lors de la suppression de toutes les photos` }, { status: 500 });
//     }
// }
