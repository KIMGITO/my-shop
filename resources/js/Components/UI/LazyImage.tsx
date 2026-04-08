import React from "react";

const LazyImage = ({
    src,
    alt = "image",
    className = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
    fallback = "https://res.cloudinary.com/dhekeyvop/image/upload/v1775646023/logo_qneo5y.png",
    ...props
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading="lazy"
            decoding="async"
            onError={(e) => (e.target.src = fallback)}
            {...props}
        />
    );
};

export default LazyImage;
