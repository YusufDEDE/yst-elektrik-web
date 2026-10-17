export type GalleryItem = {
  src: string;
  type: "image" | "video";
  alt: string;
};

export const galleryItems: GalleryItem[] = [
  { src: "/assets/field-assets/field_image_1.jpeg", type: "image", alt: "Saha Uygulaması 1" },
  { src: "/assets/field-assets/field_image_2.jpeg", type: "image", alt: "Saha Uygulaması 2" },
  { src: "/assets/field-assets/field_image_3.jpeg", type: "image", alt: "Saha Uygulaması 3" },
  { src: "/assets/field-assets/field_image_4.jpeg", type: "image", alt: "Saha Uygulaması 4" },
  { src: "/assets/field-assets/field_image_5.jpeg", type: "image", alt: "Saha Uygulaması 5" },
  { src: "/assets/field-assets/field_video_1.mp4", type: "video", alt: "Operasyon Videosu 1" },
  { src: "/assets/field-assets/field_video_2.mp4", type: "video", alt: "Operasyon Videosu 2" },
];
