import montageNeige from '../public/montagne-neige.jpg';
import montageLune from '../public/montagne-lune-1.jpg';
import montageSoleil from '../public/montagne-soleil.jpg';

/*  creation  typage de la base de donnés */
interface dataImages {
    id :Number,
    name : String,
    description: string,
    image : String,
}

export const dataImages = [
  {
      id:1,
      name: "montage1",
      description:'test montagne 1 LOL',
      image:  montageNeige,
  },
  {
      id:2,
      name: "montage2",
      description:'test montagne 2 LOL y a du soleil',
      image:  montageLune,
  },
  {
      id:3,
      name: "montage3",
      description:'test montagne 3 LOL y le coucher de soleil',
      image:  montageSoleil,
  },
];