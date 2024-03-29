import { Request, Response } from "express";
import { courseService } from "../services/courseService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const coursesController = {
    featured: async (req: Request, res: Response) => {
        try {
            const featuredCourses = await courseService.getRandomFeaturedCourses()
            res.json(featuredCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
    //GET /courses/search?name=
search: async (req: Request, res: Response) => {
    const {name }= req.query
    const [page,perPage] = getPaginationParams(req.query)
    try {
        if(typeof name !== 'string') throw new Error('name param must be of type string')
const courses = await courseService.findByName(name,page,perPage)
res.json(courses)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }
    }
},

//get /courses/newest
    newest: async (req: Request, res: Response) => {
        try {
            const newestCourses = await courseService.getTopTenNewest()
            return res.json(newestCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
//GET /courses/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const course = await courseService.findByIdWithEpisodes(id)
            res.json(course)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }


}