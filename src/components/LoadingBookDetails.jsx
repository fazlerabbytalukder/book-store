const LoadingBookDetails = () => {
    return (
        <div className="container mx-auto p-6">
            <div className="flex gap-5 animate-pulse">
                <div className='w-full md:w-[30%]'>
                    <img src="https://i.ibb.co.com/JQHPm72/dummy-242x192-ffffff-cccccc.jpg" className="w-full h-auto" />
                </div>
                <div className='w-full md:w-[70%]'>
                    <div className='text-left'>
                        <div className="w-[90%] h-[15px] bg-gray-300 mt-5"></div>
                        <div className="w-[90%] h-[13px] bg-gray-300 mt-5"></div>
                        <div className='py-2 mt-3'>
                            <div className="h-[10px] bg-gray-300 mb-2 w-[70%]"></div>
                            <div className="h-[10px] bg-gray-300 mb-2 w-[70%]"></div>
                            <div className="h-[10px] bg-gray-300 mb-2 w-[70%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingBookDetails;