import RouterGuard from 'helpers/guard';


const LayoutAdmin = (props) => {
    
    return(
        <RouterGuard>
            {props.children}
        </RouterGuard>
    )

}

export default LayoutAdmin;