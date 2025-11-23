import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
    constructor(private prisma: PrismaService) { }

    create(createNewsDto: CreateNewsDto) {
        return this.prisma.news.create({
            data: createNewsDto,
        });
    }

    findAll() {
        return this.prisma.news.findMany({
            include: {
                channel: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findByChannel(channelId: string) {
        return this.prisma.news.findMany({
            where: { channelId },
            include: {
                channel: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findOne(id: string) {
        return this.prisma.news.findUnique({
            where: { id },
            include: {
                channel: true,
            },
        });
    }

    update(id: string, updateNewsDto: UpdateNewsDto) {
        return this.prisma.news.update({
            where: { id },
            data: updateNewsDto,
        });
    }

    remove(id: string) {
        return this.prisma.news.delete({
            where: { id },
        });
    }

    // Métodos para suporte ao job de processamento
    findUnprocessedByChannel(channelId: string) {
        return this.prisma.news.findMany({
            where: {
                channelId,
                processed: false,
            },
            include: {
                channel: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findAllUnprocessed() {
        return this.prisma.news.findMany({
            where: {
                processed: false,
            },
            include: {
                channel: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async markAsProcessed(newsId: string, postId: string) {
        return this.prisma.news.update({
            where: { id: newsId },
            data: {
                processed: true,
                processedAt: new Date(),
            },
        });
    }

    async generateSeedNews(channelId: string) {
        const seedNews = [
            {
                title: 'Projeto Guri celebra 30 anos com apresentação especial em Ibitinga',
                publishedAt: new Date('2025-11-19'),
                content: 'O Teatro Municipal Darcy de Biazi foi palco, na última terça-feira (18), da apresentação do Projeto Guri em Ibitinga, marcando a conclusão das atividades de 2025 e celebrando os 30 anos de história da iniciativa. O evento reuniu famílias, educadores, convidados e a comunidade, que prestigiaram o talento dos alunos em um espetáculo preparado ao longo do ano.\nEm parceria com a Prefeitura Municipal o Projeto Guri é um espaço de formação musical, artística e cidadã para crianças e adolescentes. Durante a apresentação, o público pôde apreciar performances que evidenciam a evolução dos participantes, refletindo o compromisso do programa em promover a aprendizagem, a criatividade e o desenvolvimento humano.\nCom três décadas de atuação no estado de São Paulo, o Projeto Guri é reconhecido por transformar vidas através da música, oferecendo instrumentos, orientação e oportunidades que ampliam horizontes e fortalecem vínculos sociais.\nA apresentação de encerramento reafirmou o papel essencial da arte na formação de jovens músicos e destacou o impacto positivo do programa na comunidade ibitinguense.',
                image: 'https://www.ibitinga.sp.gov.br/fotos/fcbecc71359694716a6666a691b8ff58.jpg',
                url: 'https://www.ibitinga.sp.gov.br/portal/noticias/0/3/3700/projeto-guri-celebra-30-anos-com-apresentacao-especial-em-ibitinga',
                category: 'Outros assuntos',
            },
            {
                title: 'Audiência Pública Virtual',
                publishedAt: new Date('2025-11-18'),
                category: 'Utilidade',
                image: 'https://www.ibitinga.sp.gov.br/fotos/7e57974b89690e0525885c99d5e13dcf.png',
                url: 'https://www.ibitinga.sp.gov.br/portal/noticias/0/3/3699/audiencia-publica-virtual',
                content: 'A Prefeitura de Ibitinga lançou nesta terça-feira (18), mais uma Audiência Pública Virtual. Ao participar, o cidadão oferece sua opinião sobre os assuntos e ajuda no desenvolvimento e aprimoramento da gestão pública do Município. Como participar? O primeiro passo é ler e analisar os projetos abaixo elencados, clicando no hiperlink de download dos mesmos. Depois, o cidadão pode enviar suas considerações através do e-mail: (audienciapublica.ibitinga@gmail.com), informando nome completo e CPF. Além disso, é importante especificar no campo "assunto" do email, o título: AUDIÊNCIA PÚBLICA VIRTUAL.\n\nPrazo desta Audiência:\n19/11/2025 (16h)\n\nPROJETO DE LEI Nº 064/2025 -> Dispõe sobre a autorização a adesão da Estância Turística de Ibitinga à Associação Caminhos do Tietê – ACT, e dá outras providências.\n\nCLIQUE AQUI PARA ACESSAR O PROJETO.\n\nPROJETO DE LEI COMPLEMENTAR Nº 020/2025 -> Altera a Lei Complementar nº 223, de 26 de janeiro de 2022, que dispõe sobre a criação, extinção e reestruturação do quadro de pessoal da Fundação Educacional da EstânciaTurística de Ibitinga FEMIB e dá outras providências.\n\nCLIQUE AQUI PARA ACESSAR O PROJETO.',
            },
            {
                title: 'Prefeitura de Ibitinga realiza Curso de Poda de Árvores a Nível de Solo',
                publishedAt: new Date('2025-09-24'),
                category: 'Agricultura e meio ambiente',
                image: 'https://www.ibitinga.sp.gov.br/fotos/d22074ad279783b6acd2941f0dfaf9c6.jpg',
                url: 'https://www.ibitinga.sp.gov.br/portal/noticias/0/3/1068/prefeitura-de-ibitinga-realiza-curso-de-poda-de-arvores-a-nivel-de-solo/',
                content: 'A Prefeitura Municipal da Estância Turística de Ibitinga, por meio da Secretaria de Agricultura e Meio Ambiente, promoveu nos dias 23 e 24 de setembro de 2025 o Curso de Capacitação de Podadores de Árvores a Nível de Solo (abaixo de um metro de altura).A formação contou com uma etapa teórica, realizada no auditório "Cidade Ternura", e uma etapa prática, em áreas do município. O curso foi ministrado pelo Engenheiro Agrônomo José Wálter Figueiredo e Silva, que orientou os participantes sobre as técnicas corretas de poda, ressaltando a importância da preservação da arborização urbana e dos cuidados necessários para a saúde e longevidade das árvores.Segundo a Secretaria de Agricultura e Meio Ambiente, a ação tem como objetivo capacitar a comunidade e profissionais que atuam na manutenção de áreas verdes, garantindo que os serviços sejam realizados de forma adequada, segura e ambientalmente responsável.Ao final do curso, os participantes receberam certificados de conclusão, comprovando a participação e os conhecimentos adquiridos.Com iniciativas como esta, a Administração Municipal reforça o compromisso com a educação ambiental e com o cuidado permanente da arborização urbana, promovendo qualidade de vida e sustentabilidade para a população de Ibitinga. 24/09/2025 às 14h55',
            },
            {
                title: 'Ibitinga participa da Feira do Empreendedor do Sebrae e fortalece turismo regional',
                publishedAt: new Date('2024-10-17'),
                category: 'Desenvolvimento econômico',
                image: 'https://www.ibitinga.sp.gov.br/fotos/b453cc4a0edc98f8f0743e1def4cd980.jpg',
                url: 'https://www.ibitinga.sp.gov.br/portal/noticias/0/3/972/ibitinga-participa-da-feira-do-empreendedor-do-sebrae-e-fortalece-turismo-regional/',
                content: 'A Prefeitura de Ibitinga por meio da Secretaria de Turismo e Desenvolvimento Econômico e do Consórcio Intermunicipal do Centro do Estado de São Paulo (CICESP), participaram da maior feira de empreendedorismo do mundo: a Feira do Sebrae 2024. O evento aconteceu em São Paulo de 11 a 14 de outubro e atraiu milhares de visitantes.Ibitinga se destacou no stand do "Rotas Encantos do Interior", expondo bordados e enxovais e reforçando todo o potencial turístico do município: turismo comercial, religioso, rural e ecológico.O "Rota Encantos do Interior" uniu representantes de quatro cidades para reforçar o turismo regional: Ibitinga com seus bordados e enxovais, Itápolis com o delicioso sorvete, Borborema com os amendoins e paçocas e Tabatinga com os bichinhos de pelúcia. Centenas de visitantes passaram pelo stand, se encantaram com os produtos expostos e puderam degustar sorvete e amendoim.Declarações"O evento realizado na capital paulista teve como objetivo oferecer suporte, soluções e oportunidades para empreendedores. Também serviu de fonte de inspiração e conhecimento para quem deseja abrir o próprio negócio. Milhares de pessoas visitaram o evento. Ibitinga mais uma vez participou. Foi um evento e tanto", afirma Ângelo Paes, Secretário de Turismo e Desenvolvimento Econômico."A Feira do Empreendedor do Sebrae fomentou e gerou conhecimento, inovação, tecnologia e negócios, além de gerar desenvolvimento econômico e social. Foi um espaço muito importante para Ibitinga mostrar todo o seu potencial turístico", declara Cristina Arantes, prefeita municipal."O stand do Rota Caminhos do Interior foi uma grande vitrine para atrair novos visitantes e mostrar todo o potencial turístico da nossa região para visitantes de todas as partes do Brasil", reforça Natália Brambilla, diretora executiva do CICESP.Visitantes ilustresQuem fez questão de visitar o stand do Rota Caminhos do Interior foi o Secretário de Turismo e Viagens do Estado de São Paulo, Roberto de Lucena, além do chefe de gabinete da Secretaria de Turismo do Estado de São Paulo, Éder Rafael dos Santos e do diretor técnico do Sebrae, Marco Vinholi. Missão SebraeNeste ano, um ônibus disponibilizado pelo Sebrae levou empresários e comerciantes de Ibitinga para conhecerem a feira. A caravana participou no domingo, dia 13.Divulgação: Prefeitura de ibitinga 17/10/2024 às 11h24',
            },
        ];

        // Create all news entries
        const createdNews = await Promise.all(
            seedNews.map((news) =>
                this.prisma.news.create({
                    data: {
                        channelId,
                        title: news.title,
                        content: news.content,
                        category: news.category,
                        image: news.image,
                        url: news.url,
                        publishedAt: news.publishedAt,
                        processed: false,
                    },
                })
            )
        );

        return createdNews;
    }
}
