import { type } from "os";

/********** Type TypeScript Global NextJs */
export interface FormData {
    identifiant: string,
    password: string,
  }

export interface Ilogin {
    email:string,
    name:string,
    password:string,
    role?: 'user' | 'admin';
}

export interface login {
    login:String,
}

export interface Iphotos {
    _id: mongoose.Types.ObjectId;
    title: string,
    description :string,
    imagePath : string 
}

export interface DataPhotos {
    photos : Iphotos[],
    totalPhotos : number,
    totalPages : number,
}
export interface JwtPayload {
    role?: string;
    userId: string;
  }
// export type ApiResponse = {
//     photos: Iphotos[],
//     totalPhotos: number
//   }
  
// export interface RoleContextType {
//     user: IuserRole | null;
//     setUser: React.Dispatch<React.SetStateAction<IuserRole | null>>;
//   }
export interface ShootingData {
    title: string;
    imagePath: string[];
}


export interface Ishooting {
    _id: mongoose.Types.ObjectId;
    title : String,
    imagePath : String[],
}

export interface Inewsletter{
    email:String,
    dateSubscribed:Date
        
}
export interface Subscriber {
    email: string;
  }

export interface RoleContextType {
    user: IRoleOnly | null;
    setUser: React.Dispatch<React.SetStateAction<IRoleOnly | null>>;
  }

export interface RoleProviderProps {
    children: ReactNode;
  } 
  
export interface IuserRole{
    id: string;
    name: string;
    role: 'user' | 'admin';
}

export interface IRoleOnly {
    role: 'user' | 'admin';
}

export interface Iadmin{
    name :String,
    password : String
}

export interface Itest {
    name: string
}
// exemples

// export interface ITask {
//     _id: string;
//     task: string;
//     completed: boolean;
// }

// export interface IDeleteTaskRequestParam {
//     params: {
//         id: string;
//     }
// }

// export interface TaskProps {
//     individualTask: ITask;
//     handleCompleteTask: (id: string) => void;
//     handleDeleteTask: (id: string) => void;
// }

// export interface AddTaskProps {
//     task: string;
//     setTask: (task: string) => void;
//     handleCreateTask: () => void;
// }