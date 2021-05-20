const { List, Category, Link } = require('../models');

module.exports = {

    getAllCategories: async (request, response, next) => {
        try {
            const categories = await Category.findAll({
                where: {member_id : request.session.userid},
                // include: { all: true, nested: true},
                // include: 'list',
                include: {
                    model: List, 
                    as: 'list',
                    include: {
                        model: Link,
                        as: 'links',            
                    }        
                },
                order: [['id', 'ASC']]
            });
            response.json(categories);
        } catch (error) {
            next(error);
        }
    },

    createCategory: async (request, response, next) => {
        const data = request.body;
        const userId = request.session.userid;
        console.log('data', data)
        if (!data.name) {
            return response.status(400).json({
                error: `You must provide a name`
            });
        }

        // if (data.position && isNaN(Number(data.position))) {
        //     return response.status(400).json({
        //         error: `position must be a number`
        //     });
        // }

        try {

            const category = await Category.create({name: data.name, member_id: userId});
            response.json(category);

        } catch (error) {
            next(error);
        }
    },

    updateCategory: async (request, response, next) => {

        const data = request.body;
        const id = Number(request.params.id);
        const memberCategories = await Category.findAll({
            where: {member_id : request.session.userid}
        });

        if (isNaN(id)) {
            return response.status(400).json({
                error: `the provided id must be a number`
            });
        }

        if (!data.name) {
            return response.status(400).json({
                error: `You must provide a name`
            });
        }

        if (!memberCategories[0]) {
            return response.status(403).json({
                error: `Not one of your categories`
            });
        }

        // if (userId !== categories[0].dataValues.member_id) {
        //     return response.status(403).json({
        //         error: `Not one of your categories`
        //     });
        // }

        // if (data.position && isNaN(Number(data.position))) {
        //     return response.status(400).json({
        //         error: `position must be a number`
        //     });
        // }

        try {
            const category = await Category.findByPk(id);

            if (!category) {
                return next();
            }

            for (const field in data) {

                if (typeof category[field] !== 'undefined') {
                    category[field] = data[field];
                }

            }
            await category.save();
            response.json(category);
        } catch (error) {
            next(error);
        }

    },

    deleteCategory: async (request, response, next) => {

        const id = Number(request.params.id);
        const memberCategories = await Category.findAll({
            where: {member_id : request.session.userid}
        });

        if (!memberCategories[0]) {
            return response.status(400).json({
                error: `Not one of your categories`
            });
        }

        if (isNaN(id)) {
            return response.status(400).json({
                error: `the provided id must be a number`
            });
        }

        try {
            const category = await Category.findByPk(id);
            if (!category) {
                next();
            }

            await category.destroy();
            response.json('OK, category deleted');

        } catch (error) {
            next(error);
        }

    },

    addListToCategory: async (request, response, next) => {

        const listId = request.params.id;
        

        if (isNaN(listId)) {
            return response.status(400).json({
                error: `the provided id must be a number`
            });
        }

        const categoryId = request.body.category_id;

        if (isNaN(categoryId)) {
            return response.status(400).json({
                error: `the provided category_id must be a number`
            });
        }

        try {

            let list = await List.findByPk(listId, {
                include: ['categories']
            });

            if (!list) {
                return next();
            }

            let category = await Category.findByPk(categoryId);
            if (!category) {
                return next();
            }

            // on laisse faire la magie de Sequelize !
            await list.addCategory(category);
            // malheureusement, les associations de l'instance ne sont pas mises à jour
            // on doit donc refaire un select
            list = await List.findByPk(listId, {
                include: ['categories']
            });
            response.json(list);

        } catch (error) {
            console.log("listID", listId);
            next(error);
        }
    },

    removeListFromCategory: async (request, response) => {

        const { list_id, category_id } = request.params;

        if (isNaN(list_id)) {
            return response.status(400).json({
                error: `the provided listId must be a number`
            });
        }

        if (isNaN(category_id)) {
            return response.status(400).json({
                error: `the provided categoryId must be a number`
            });
        }

        try {
            let list = await List.findByPk(list_id);
            if (!list) {
                return next();
            }

            let category = await Category.findByPk(category_id);
            if (!category) {
                return next();
            }

            await list.removeCategory(category);
            list = await List.findByPk(list_id, {
                include: ['categories']
            });
            response.json(list);

        } catch (error) {
            next(error);
        }
    }

}