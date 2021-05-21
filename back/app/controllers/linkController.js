const { Link } = require('../models');
const axios = require('axios')

module.exports = {

    createLink: async (request, response, next) => {

        const data = request.body;
        const userId = request.session.userid;
        console.log(data);
        const getLinkPreviewDatas = async () => {  
        try {          
            return await axios.get(`http://api.linkpreview.net/?key=881162a141e99a69629e7a4a4661a633&fields=site_name&q=${data.url}`)
        } catch(error) {
            console.error('catch tree', error);
        }}

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
            const linkPreviewDatas = async () => {
                let datas = await getLinkPreviewDatas()
                datas = datas.data;
                const link = await Link.create({
                    url: datas.url,
                    title: datas.title,
                    description: datas.description,
                    image: datas.image,
                    site_name: datas.site_name,
                    list_id: data.list_id,
                    member_id: userId
                });
                response.json(link);
            }
            linkPreviewDatas();
        } catch (error) {
            next('error', error);
        }
    },

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