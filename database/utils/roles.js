import { AccessControl } from 'accesscontrol'


const allRights = {
    'create:any':['*'],
    'read:any':['*'],
    'update:any':['*'],
    'delete:any':['*'],
}



let grantsObject = {
     admin:{
         shows:allRights
     },
     user:{
        shows:{
            'read:any':['*']
        }
     }
}

const roles = new AccessControl(grantsObject);
export default roles;