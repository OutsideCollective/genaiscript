script({
    title: "Generate Slides",
    description: "Generate a slidedeck in markdown. Install extension 'vscode-reveal'.",
    categories: ["samples"],
    temperature: 0.1,
})

const output = env.spec.filename.replace(/\.gpspec\.md$/, ".slides.md")
def(
    "SOURCE",
    [env.spec,
    ...env.files.filter(
        (f) => !f.filename.endsWith(".slides.md")
    )]
)

$`Generate a slidedeck in markdown format for the content in SOURCE
in file ${output} using markdown.

-  Each slide SHOULD have a title, unless it is only showing a code snippet.
-  USE heading level 3 for slide titles.
-  Do NOT add "Slide:" or "Title:" in the slide.
-  Keep slides titles VERY short.
-  USE --- to separate slides.
-  Keep the content on each slide short. Maximum 3 bullet points.
-  Use mermaid syntax if you need to generate state diagrams, class inheritance diagrams, relationships.
-  If the source is code, describe the code and show the code in a separate slide.
-  Keep code snippet short. Maximum 10 lines. Maximum 42 columns. Use multiple slides if needed. Ellipse sections with ... if necessary.
-  The first slide have a title and a summary of the slidedeck.
-  IGNORE Contributing, Copyright and Trademarks sections.
`