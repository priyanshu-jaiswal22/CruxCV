export const parseAIOutput = (text = "") => {
  const getSection = (label) => {
    const regex = new RegExp(
      `${label}\\s*:\\s*([\\s\\S]*?)(\\n\\s*[A-Z]+\\s*:|$)`,
      "i"
    );
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  };

  const cleanList = (section) =>
    section
      .split("\n")
      .map((item) =>
        item.replace(/^[-*•]\s*/, "").trim()
      )
      .filter(Boolean);

  return {
    summary: getSection("SUMMARY"),
    skills: cleanList(getSection("SKILLS")),
    improvements: cleanList(getSection("IMPROVEMENTS")),
  };
};

