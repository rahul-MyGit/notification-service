import { prisma } from '../connection';
import { Template } from '../../types/template';

export async function getTemplateById(id: string): Promise<Template | null> {
    return await prisma.template.findUnique({
        where: { id }
    });
}

export async function createTemplate(data: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>): Promise<Template> {
    return await prisma.template.create({
        data
    });
}

export async function updateTemplate(id: string, data: Partial<Template>): Promise<Template> {
    return await prisma.template.update({
        where: { id },
        data
    });
}