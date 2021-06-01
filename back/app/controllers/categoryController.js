const { List, Category, Link } = require('../models');

module.exports = {

    getAllCategories: async (request, response, next) => {
        try {
            const categories = await Category.findAll({
                where: {member_id : request.session.userid},
                // include: {
                //     model: List, 
                //     as: 'list',
                //     where: {member_id : request.session.userid},
                //     include: {
                //         model: Link,
                //         as: 'links',
                //         where: {member_id : request.session.userid},         
                //     }        
                // },
                order: [['name', 'ASC']]
            });
            if (!categories) {
                return response.status(404).json({
                    error: `There are no categories`
                });
            } else {
               response.json(categories);
            }          
        } catch (error) {
            next(error);
        }
    },

    createCategory: async (request, response, next) => {
        const data = request.body;
        const userId = request.session.userid;
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
        const memberCategories = await Category.findOne({
            where: {member_id : request.session.userid, id : id}
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

        if (!memberCategories) {
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
        const memberCategories = await Category.findOne({
            where: {member_id : request.session.userid, id : id}
        });

        if (!memberCategories) {
            return response.status(403).json({
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

    }

}