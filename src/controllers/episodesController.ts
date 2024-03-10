import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { episodeService } from "../services/episode.Service";

export const episodesController = {
    //get/episodes/stream?videoUrl=
    stream: async (req: Request, res: Response) => {
        const { videoUrl } = req.query

        try {
            if (typeof videoUrl !== 'string') throw new Error('videoUrl param must be of type string')
            const range = req.headers.range //bytes=0 - 1024

            episodeService.streamEpisodeToResponse(res,videoUrl,range)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}