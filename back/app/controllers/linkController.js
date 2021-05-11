const { Link } = require('../models');

module.exports = {

    getLinksInList: async (request, response, next) => {

        const id = Number(request.params.id);

        if (isNaN(id)) {
            return response.status(400).json({
                error: `the provided id must be a number`
            });
        }

        try {
            const links = await Link.findAll({
                where: {
                    list_id: id
                }
            });

            response.json(links);
        } catch (error) {
            next(error);
        }
    },

    getOneLink: async (request, response, next) => {

        const id = Number(request.params.id);

        if (isNaN(id)) {
            return response.status(400).json({
                error: `the provided id must be a number`
            });
        }

        try {
            const link = await Link.findByPk(id);

            if (!link) {
                return next();
            }

            response.json(link);
        } catch (error) {
            next(error);
        }
    },

    createLink: async (request, response, next) => {
        const data = request.body;
        console.log(data);
        if (!data.url) {
            return response.status(400).json({
                error: `You must provide a url`
            });
        }

        if (data.position && isNaN(Number(data.position))) {
            return response.status(400).json({
                error: `position must be a number`
            });
        }

        try {
            const link = await Link.create(data);
            response.json(link);

        } catch (error) {
            next(error);
        }
    },

    updateLink: async (request, response, next) => {

        const data = request.body;

        const id = Number(request.params.id);

        if (isNaN(id)) {
            return response.status(400).json({
                error: `the provided id must be a number`
            });
        }

        if (!data.url) {
            return response.status(400).json({
                error: `You must provide a url`
            });
        }

        if (data.position && isNaN(Number(data.position))) {
            return response.status(400).json({
                error: `position must be a number`
            });
        }

        try {
            const link = await Link.findByPk(id);
            if (!link) {
                return next();
            }
            
            for (const field in data) {

                if (typeof link[field] !== 'undefined') {
                    link[field] = data[field];
                }

            }
            await link.save();
            response.json(link);
        } catch (error) {
            next(error);
        }

    },

    deleteLink: async (request, response, next) => {

        const id = Number(request.params.id);

        if (isNaN(id)) {
            return response.status(400).json({
                error: `the provided id must be a number`
            });
        }

        try {
            const link = await Link.findByPk(id);
            if (!link) {
                next();
            }

            await link.destroy();
            response.json('OK');

        } catch (error) {
            next(error);
        }

    },

}