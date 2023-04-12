export interface Comment {
    
        id: string, // unique identifier for the comment
        content: string, // content of the comment
        author: {
          name: String, // name of the comment's author
          email: string, // email address of the comment's author
        },
        date: string // date the comment was created
      
    
  }
  