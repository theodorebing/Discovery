const { List, Category } = require('../models');

module.exports = {

    createList: async (request, response, next) => {
        const data = request.body;
        const categoryId = request.params.id;
        const userId = request.session.userid;
        let findIfCategoryExists = await Category.findOne({
            where: {member_id : request.session.userid, id : categoryId}
        });
        const findHighestPosition = await List.findAndCountAll({
            where: {member_id : request.session.userid, category_id : categoryId}
        });
        if (!findIfCategoryExists) {
                return response.status(400).json({
                    error: `A user can only create a list to one of his existing categories`
                });
        }
        if (!data.name) {
            return response.status(400).json({
                error: `you must provide a name`
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
                position: (findHighestPosition.count++), 
                category_id: categoryId, 
                member_id: userId});
            response.json(list);

        } catch (error) {
            next(error);
        }
    },

    getAllListsFromCategory: async (request, response, next) => {

        const id = Number(request.params.id);
        console.log('id', id)

        try {
            const lists = await List.findAll({
                where: {member_id : request.session.userid, category_id : id},
                include: {
                    association: 'links'
                }, 
                order: [
                    ['position', 'ASC'],
                    [['links', 'position', 'ASC']]
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
            const list = await List.findOne({
                where: {member_id : request.session.userid, id: id},
                include: {
                    association: 'links'
                }
            });

            if (!list) {
            return response.status(404).json({
                error: `Not one of your lists`
            });
            }

            response.json(list);
        } catch (error) {
            next(error);
        }
    },

    updateList: async (request, response, next) => {

        const data = request.body;

        let findIfCategoryExists = await Category.findOne({
            where: {member_id : request.session.userid, id : data.category_id}
        });

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


        if (!findIfCategoryExists) {
                return response.status(404).json({
                    error: `A user can only move a list to one of his existing categories`
                });
        }

        // if (!data.name) {
        //     return response.status(400).json({
        //         error: `You must provide a name`
        //     });
        // }

        try {
            const list = await List.findOne({
                where: {member_id : request.session.userid, id: id},
            });
            if (!list) {
                return response.status(404).json({
                    error: `Not one of your lists`
                });
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
            const list = await List.findOne({
                where: {member_id : request.session.userid, id: id},
            });
            if (!list) {
                return response.status(404).json({
                    error: `Not one of your lists`
                });
            }

            await list.destroy();
            response.json('OK, list deleted');

        } catch (error) {
            next(error);
        }

    },

}