import { Command, program } from "commander"

export async function helpAll() {
    console.log(`---`)
    console.log(`title: Commands`)
    console.log(`sidebar:`)
    console.log(`  order: 100`)
    console.log(`---\n`)

    console.log(`<!-- autogenerated, do not edit -->`)
    console.log(`A full list of the CLI command and its respective help text.`)

    const visit = (
        header: string,
        parent: Command,
        commands: readonly Command[]
    ) => {
        commands.forEach((c) => {
            if (c.name() === "help-all") return
            console.log(
                `\n${header} \`${[parent?.name(), c.name()].filter((c) => c).join(" ")}\`\n`
            )
            console.log("```")
            c.outputHelp()
            console.log("```")
            if (c.commands?.length) {
                visit(header + "#", c, c.commands)
            }
        })
    }
    visit("##", undefined, program.commands)
}
