// export async function DELETE(req: NextRequest) {
//     try {
//         // Vérification REQ Methode DELETE
//         if (req.method !== 'DELETE') {
//             return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//         }

//         const { id } = req.query; // Récupération de l'ID de la photo

//         // Connexion à la base de données
//         await connectToDB();

//         // Trouver la photo par ID et la supprimer
//         const deletedPhoto = await Photo.findByIdAndDelete(id);
//         if (!deletedPhoto) {
//             return NextResponse.json({ error: 'Photo non trouvée' }, { status: 404 });
//         }

//         // Suppression du fichier image associé (si nécessaire)
//         // Vous pouvez utiliser le module 'fs' pour supprimer le fichier
//         // par exemple : fs.unlinkSync(deletedPhoto.imagePath);

//         return NextResponse.json({ message: 'Photo supprimée avec succès' });
//     } catch (error) {
//         console.error("Erreur lors de la suppression de la photo:", error);
//         return NextResponse.json({ error: `Erreur lors de la suppression de la photo` }, { status: 500 });
//     }
// }
