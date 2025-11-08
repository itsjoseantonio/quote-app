const Footer = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return (
        <footer className='bg-coffee py-5 text-white'>
            <div className='container mx-auto px-4 text-sm'>
                &copy; {currentYear} All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
