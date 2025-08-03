
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    //mendefinisikan style dasar untuk badge
    //ini akan menjadi class dasar yang digunakan untuk semua badge
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        //mendefinisikan variasi style untuk badge
        //ini akan menjadi class yang digunakan untuk badge dengan variant tertentu
        //misalnya: variant="secondary" akan menggunakan style yang didefinisikan di sini
        //dan akan menggabungkan dengan class dasar
        //jadi badge dengan variant "secondary" akan memiliki style dasar + style secondary
        //dan seterusnya untuk variant lainnya
        //ini juga akan menggabungkan dengan class tambahan yang diberikan di props className
        //jadi jika kita memberikan class tambahan di props className, itu akan digabungkan dengan
        //class dasar dan class variant
        //misalnya: <Badge className="my-class" variant="secondary">Text</Badge>
        //akan menghasilkan class "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 my-class secondary"
        //jadi kita bisa menambahkan class tambahan
        //tanpa perlu mengubah class dasar atau class variant
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)
// pengenalan type untuk props Badge
// ini akan menggabungkan className dan variant dari badgeVariants
// dan juga menambahkan semua atribut HTML yang valid untuk div
// sehingga Badge bisa digunakan seperti div biasa
// misalnya: <Badge className="my-class" variant="secondary">Text</Badge
export interface BadgeProps
//inherit semua atribut HTML untuk div
    //dan juga menambahkan variant dari badgeVariants
    //jadi BadgeProps akan memiliki className, variant, dan semua atribut HTML yang valid untuk
    //div seperti onClick, role, tabIndex, dll
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { 
        
    }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }