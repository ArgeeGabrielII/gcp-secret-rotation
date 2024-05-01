import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { IsPublic } from 'src/decorator/is-public.decorator';

@Controller('/health')
export class HealthController {
    constructor(private healthService: HealthService) {}

    @IsPublic()
    @Get()
    getHealth(): any {
        return this.healthService.getHealth();
    }
}
