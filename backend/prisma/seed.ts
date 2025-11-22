import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Criar o canal de Ibitinga - SP
    const ibitingaChannel = await prisma.channel.upsert({
        where: { name: 'ibitinga_sp_channel' },
        update: {},
        create: {
            name: 'ibitinga_sp_channel',
            description: 'Canal Ibitinga - SP',
            avatar: null,
            category: 'municipal',
        },
    });

    console.log('✅ Canal criado:', ibitingaChannel);
    console.log('🎉 Seed concluído com sucesso!');
}

main()
    .catch((e) => {
        console.error('❌ Erro ao executar seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
