const express = require('express');
const fs = require('fs')
const users = require('./MOCK_DATA.json') // importing data from json
const app = express();

const PORT = 8000;

// Middleware - PlugIn 
app.use(express.urlencoded({ extended: false }));

/* => here the server send a HTML formate data or document data in browser.
   => this is called server side rendering in react/next.js */
app.get('/users', (req, res) => {
    /*
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>

    */
    const html = `
        <ol>
            ${users.map((user) => `
            <li>${user.first_name}</li>            
            <br>
            ` ).join("")}
        </ol>
   `;
    res.send(html)

})


// here it will print the json formate data.

// REST api part start.
// GET /api/users -> all json data
app.get('/api/users', (req, res) => {
    return res.json(users)
})

// GET /api/users/:id -> data of single user in json get through id.
app.route('/api/users/:id')
    /*
    this is grouping with single route multiple action performed.
    LIKE: GET, PUT, PATCH, DELTE.
    */
    .get((req, res) => {
        /*
        -> getting id
        -> converting the id from string to number using Number()  
        
        */
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    // PATCH
    .patch(async (req, res) => {
        // TODO : Edit user with id
        const UpdateUserData = req.body;
        const IdToUpdate = Number(req.params.id);

        

        // find index of the user with the given id
        const index = users.findIndex(user => user.id === IdToUpdate);

        

        if (index !== -1) {

            users[index] = { ...users[index], ...UpdateUserData };

            // users[index] = Object.assign({}, users[index], UpdateUserData);


        
            try {
                // Use fs.promises.writeFile for better async handling
                fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err) => {

                    return res.json({ status: 'Successfully updated.' });
                        
                });
          
              } catch (error) {
                console.error('Error writing to file:', error);
                return res.status(500).json({ status: 'Error', message: 'Failed to write to file' });
              }
            } else {
              return res.status(404).json({ status: 'Error', message: 'User not found' });
            }
    })
    // .patch((req, res) => {

    //         // TODO: Edit user with id
    //         const IdToUpdate = Number(req.params.id);
    //         const UpdateUserData = req.body;

    //         // find index of the user with the given id
    //         const index = users.findIndex(user => user.id === IdToUpdate);

    //         if (index !== -1) {
    //             users[index] = { ...users[index], ...UpdateUserData };

    //             fs.writeFile('./MOCK_DATA.json', JSON.stringify(users,null,2), 'utf-8', (err) => {
    //                 if (err) {
    //                     console.error('Error writing to file:', err);
    //                     return res.status(500).json({ status: 'Error', message: 'Failed to write to file' });
    //                 }
    //                 return res.json({ status: 'Successfully updated.' });
    //             });
    //         } else {
    //             return res.status(404).json({ status: 'Error', message: 'User not found' });
    //         }


    // })



    // DELETE
    .delete((req, res) => {
        // delete user with id.

        // Assuming the body contain the id to delete
        const IdToDelete = Number(req.params.id);
        // find index of the user with the given id
        const index = users.findIndex(user => user.id === IdToDelete);

        // condition to delete
        if (index !== -1) {
            users.splice(index, 1);

            // write the update data back to the file.
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
                return res.json({ status: 'Successfully deleted..' });
            })
        } else {
            return res.json({ status: 'Not deleted' });
        }




    })

// POST
app.post('/api/users/', (req, res) => {
    // Creating a new user.
    const body = req.body;
    // pushing into body 
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: 'Success', id: users.length });

    })
})

// PATCH
// app.patch('/api/users/:id', (req,res) => {
//     //TODO: Edit user through id.
//       return  res.json({statu: 'Pending'});
// })

// DELETE
// app.delete('/api/users/:id', (req,res) => {
//     //TODO: delete user through id.
//       return  res.json({statu: 'Pending'});
// })

app.listen(PORT, () => console.log(`Server started at: ${PORT}`))