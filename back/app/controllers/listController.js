const { List } = require('../models');

module.exports = {

    createList: async (request, response, next) => {
        const data = request.body;
        const userId = request.session.userid;
        console.log('userId', userId);

        if (!data.name) {
            return response.status(400).json({
                error: `You must provide a name`
            });
        }

        if (data.position && isNaN(Number(data.position))) {
            return response.status(400).json({
                error: `position must be a number`
            });
        }

        try {
            const list = await List.create({
                name: data.name, 
                position: data.position, 
                category_id: data.category_id, 
                member_id: userId});
            response.json(list);

        } catch (error) {
            next(error);
        }
    },

    getAllLists: async (request, response, next) => {

        try {
            const lists = await List.findAll({
                where: {member_id : request.session.userid},
                include: {
                    association: 'links'
                }, 
                order: [
                    ['position', 'ASC']
                ]
            });       

            if (!lists[0]) {
                return response.status(404).json({
                    error: `There are no lists`
                });
            } else {
                response.json(lists);
            }
            
        } catch (error) {
            next(error);
        }
    },

    getOneList: async (request, response, next) => {

        const id = Number(request.params.id);

        if (isNaN(id)) {
            return response.status(400).json({
                error: `the provided id must be a number`
            });
        }

        try {
            const list = await List.findByPk(id, {
                include: {
                    association: 'links'
                }
            });

            if (!list) {
                return next();
            }

            response.json(list);
        } catch (error) {
            next(error);
        }
    },

    updateList: async (request, response, next) => {

        const data = request.body;

        const id = Number(request.params.id);
        if (isNaN(id)) {
            return response.status(400).json({
                error: `the provided id must be a number`
            });
        }

        if (data.position && isNaN(Number(data.position))) {
            return response.status(400).json({
                error: `position must be a number`
            });
        }

        /*if (!data.name) {
            return response.status(400).json({
                error: `You must provide a name`
            });
        }*/

        try {
            const list = await List.findByPk(id);
            if (!list) {
                next();
            }

            for (const field in data) {
                if (typeof list[field] !== 'undefined') {
                    list[field] = data[field];
                }
            }
            await list.save();
            response.json(list);
        } catch (error) {
            next(error);
        }

    },

    deleteList: async (request, response, next) => {

        const id = Number(request.params.id);

        if (isNaN(id)) {
            return response.status(400).json({
                error: `the provided id must be a number`
            });
        }

        try {
            const list = await List.findByPk(id);
            if (!list) {
                return next();
            }

            await list.destroy();
            response.json('OK');

        } catch (error) {
            next(error);
        }

    },

}