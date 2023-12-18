export default function ImagePicker({ images, selectedImage, onSelect }) {
  return (
    <div id="image-picker">
      <p className="block mb-2 text-sm font-medium text-gray-900 ">
        Select an image
      </p>
      <ul className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <li
            key={image.name}
            onClick={() => onSelect(image.name)}
            className={`${
              selectedImage === image.name
                ? "outline outline-offset-2 outline-red-500 "
                : ""
            }`}
          >
            <img
              className="object-contain h-20 w-20"
              src={`http://localhost:3000/${image.name}`}
              alt={image.caption}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
