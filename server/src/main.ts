import { NestFactory } from "@nestjs/core"
import { DocumentBuilder } from "@nestjs/swagger"
import { SwaggerModule } from "@nestjs/swagger/dist"
import { raw } from "express"
import { AppModule } from "./app.module"

const start = async () => {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule, {rawBody: true, cors: true, bodyParser: true})
    const config = new DocumentBuilder()
    .setTitle("Minecraft Server")
    .setDescription("REST API")
    .setVersion("1.0.0")
    .build()
    const doc = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, doc)

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()