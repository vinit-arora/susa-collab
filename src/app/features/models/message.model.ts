export interface Message {
    
    id: String, // unique identifier for the comment
    content: any, // content of the comment
    author: {
      name: String, // name of the comment's author
      email: string, // email address of the comment's author
    },
    createdAt: Date // date the comment was created
  

}
