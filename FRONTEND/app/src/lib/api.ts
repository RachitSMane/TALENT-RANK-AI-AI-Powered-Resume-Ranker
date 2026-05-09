export async function rankCandidates(
  jobDescription: string,
  files: File[]
) {

  const formData = new FormData();

  formData.append("job_description", jobDescription);

  files.forEach((file) => {
    formData.append("resumes", file);
  });

  const response = await fetch(
    "http://127.0.0.1:5000/rank",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to rank candidates");
  }

  return response.json();
}