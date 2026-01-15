export const parseAIOutput = (text) => {
  const getSection = (label) => {
    const regex = new RegExp(`${label}:([\\s\\S]*?)(\\n[A-Z]+:|$)`);
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  };

  return {
    summary: getSection("SUMMARY"),
    skills: getSection("SKILLS")
      .split("\n")
      .map(s => s.replace("-", "").trim())
      .filter(Boolean),
    improvements: getSection("IMPROVEMENTS")
      .split("\n")
      .map(i => i.replace("-", "").trim())
      .filter(Boolean)
  };
};
