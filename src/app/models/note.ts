export type Note = {
    id:Number | undefined,
    title:string,
    content:string,
    priority?:string,
    reminderDate?:Date,
    category?:string
}