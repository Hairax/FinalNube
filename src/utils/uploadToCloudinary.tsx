export const uploadToCloudinary = async (
  file: File,
  type: "image" | "audio"
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "finalNube");

  const resourceType = type === "audio" ? "video" : "image";

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dc4zl1iep/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Error al subir archivo");

  const data = await res.json();
  return data.secure_url;
};
