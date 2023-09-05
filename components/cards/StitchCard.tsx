"use client"

interface Props {
    id: string,
    currentUserId: string,
    key: string,
    parentId: string | null,
    content: string,
    author: string,
    community: {
        id: string,
        name:string,
        image: string 
    } | null,
    createdAt: string,
    comments: {
        author: {
            image: string,
            
        }
    }[],
    // isComment?: boolean
}

function StitchCard ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment}: Props){


    return (
            <h2 className="text-small-regular text-light-2">
                Hi {id}! <br />
                Current user: {currentUserId}, <br />
                content: {content}, <br/>
                author: {author}, <br/>
                community: {community}, <br/>
                createdat: {createdAt},<br/>
                comments: {comments},<br/>
                parentId: {parentId}, <br/>
                
                
            </h2>
    )
    
}


export default StitchCard