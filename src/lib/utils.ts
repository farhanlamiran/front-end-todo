import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// type ClassInput =
//     | string
//     | undefined
//     | null
//     | false
//     | ClassInput[] // rekursif, bisa nested array
//     | { [key: string]: boolean } // object dengan key class dan value boolean

// export function cn(...inputs: ClassInput[]): string {
//     const classes: string[] = []

//     for (const input of inputs) {
//         if (!input) continue

//         if (typeof input === "string") {
//             classes.push(input)
//         } else if (Array.isArray(input)) {
//             classes.push(cn(...input)) // recursive call
//         } else if (typeof input === "object") {
//             for (const [key, value] of Object.entries(input)) {
//                 if (value) classes.push(key)
//             }
//         }
//     }

//     return classes.join(" ")
// }