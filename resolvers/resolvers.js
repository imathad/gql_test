

const resolvers = {
    Query: {
        getUserById: async (parent, args, { pool }, info) => {
            const { id } = args
            const query = `select * from users where id=${id}`
            const res = await pool.query(query)
            let user = {
                id: null,
                name: null,
                email: null
            }

            res.rows.map(data => {
                let { id, name, email } = data
                user = {
                    id, name, email
                }
            })
            return user
        },
        getAllUsers: async (parent, args, { pool }, info) => {
            const query = `select * from users`
            const res = await pool.query(query)
            let user = {
                id: null,
                name: null,
                email: null
            }
            let users = []

            res.rows.map(data => {
                let { id, name, email } = data
                user = {
                    id, name, email
                }
                users.push(user)
            })
            return users
        },
    },
    Mutation: {
        addUser: async (parent, args, { pool }, info) => {

            let { name, email, password } = args
            let user = {
                id: null,
                name: null,
                email: null
            }
            const query = {
                text: `insert into users (name,email,password) values($1,$2,$3) returning*`,
                values: [name, email, password]
            }
            const res = await pool.query(query)


            res.rows.map(data => {
                let { id, name, email } = data
                user = {
                    id, name, email
                }
            })
            return user
        },

        updateUser: async (parent, args, { pool }, info) => {

            let { id, name, email } = args
            const query = {
                text: `update users set name=$1,email=$2 where id=$3 returning*`,
                values: [name, email, id]
            }
            const res = await pool.query(query)
            let user = {
                id: null,
                name: null,
                email: null
            }

            res.rows.map(data => {
                let { id, name, email } = data
                user = {
                    id, name, email
                }
            })
            return user
        },

        deleteUserById: async (parent, args, { pool }, info) => {

            let { id } = args
            const query = `delete from users where id=${id} returning*`
            const res = await pool.query(query)
            let user = {
                id: null,
                name: null,
                email: null
            }

            res.rows.map(data => {
                let { id, name, email } = data
                user = {
                    id, name, email
                }
            })
            return user
        },
    }
}

module.exports = { resolvers }