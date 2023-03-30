import { ApiProperty } from "@nestjs/swagger";

export class CreateVideoDto {
    @ApiProperty({example: 'My Video', description: "Video Title"})
    readonly title: string;

    @ApiProperty({example: 'my first video', description: "Video Description"})
    readonly description: string;
    
    @ApiProperty({example: '#nest #react', description: "Video Tags"})
    readonly tags: string;
}