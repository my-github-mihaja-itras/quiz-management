

export const config = {
    token: {
        secret: process.env.JWT_SECRET_KEY,
        expiredIn: process.env.JWT_EXPIRATION,
        // teste: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlNVUEVSX0FETUlOX0xPR0lOIiwiX2lkIjoiNjU2NWQ1MzViM2I3MzQyNTQ3NTJhMWJlIiwiaWF0IjoxNzAxNzYyMzI0LCJleHAiOjE3MDE3OTgzMjR9.2S61oWe8K73ylRUlx0jWUhUKXF4gAlv9cyXWpaa9ECQ"
    }
}
