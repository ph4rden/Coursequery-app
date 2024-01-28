import React from "react";
import styles from '@/components/ui/Nav/Nav.module.css'
import TempLogo from "@/assets/TempLogo1.png";  

const Nav: React.FC<{}> = () => {
    return (
        <nav className = {styles.navbar}>
            <div className = {styles['logo-container']}>
                <img src={TempLogo} alt="Site Logo" /> 
            </div>
        
        </nav>
    )
}

export default Nav;