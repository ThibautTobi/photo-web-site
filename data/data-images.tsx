import montageNeige from '../public/montagne-neige.jpg';
import montageLune from '../public/montagne-lune-1.jpg';
import montageSoleil from '../public/montagne-soleil.jpg';

// interface dataImages {
//     id :Number,
//     name : String,
//     image : String,
// }

// exmeples typage typescript
/*
export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: 'Layouts',
    items: [
      {
        name: 'Nested Layouts',
        slug: 'layouts',
        description: 'Create UI that is shared across routes',
      },
      {
        name: 'Grouped Layouts',
        slug: 'route-groups',
        description: 'Organize routes without affecting URL paths',
      },
      {
        name: 'Parallel Routes',
        slug: 'parallel-routes',
        description: 'Render multiple pages in the same layout',
      },
    ],
  },
*/

export const dataImages = [
{
    id:1,
    name: "montage",
    image:{montageNeige},
},
{
    id:2,
    name: "montage",
    image:{montageLune},
},
{
    id:3,
    name: "montage",
    image:{montageSoleil},
},
];