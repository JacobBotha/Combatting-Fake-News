import Menu from './menu'

export default function Layout({ children }) {
    return (
        <>
            <Menu></Menu> 
            <main>{children}</main>
        </>
    );
}