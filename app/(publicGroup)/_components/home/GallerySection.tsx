import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
];

export function GallerySection() {
  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {images.map((image, index) => {
          const isLarge = index === 0 || index === 3;

          return (
            <div
              key={`${image}-${index}`}
              className={`relative h-64 overflow-hidden rounded-[28px] ${
                isLarge ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <Image
                src={image}
                alt={`Service showcase ${index + 1}`}
                fill
                priority={index === 0}
                sizes={
                  isLarge
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
