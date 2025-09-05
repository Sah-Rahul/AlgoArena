const Footer = () => {
  return (
    <>
      <div className="h-24 bg-green-600 w-full">
        {/* Footer Placeholder */}
        <footer className="text-center py-6 border-t border-white/10 text-sm text-gray-500">
          © {new Date().getFullYear()} LeetLab Clone — Built by You
        </footer>
      </div>
    </>
  );
};

export default Footer;
