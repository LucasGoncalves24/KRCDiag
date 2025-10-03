// Configuração personalizada para o plugin jQuery TableSorter
const tableSorterOptions = {
    
    // Mantém as larguras das colunas fixas após ordenação
    widthFixed: true,

    // Exibe um indicador de carregamento durante o processamento (ordenando, filtrando, etc.)
    showProcessing: true,

    // Template para os cabeçalhos: mostra o conteúdo e o ícone de ordenação
    headerTemplate: '{content} {icon}',

    // Ativação dos widgets adicionais para a tabela
    widgets: ['zebra', 'stickyHeaders', 'filter', 'math'],

    // Funções para extrair texto das células de forma personalizada (útil para ordenação correta)
    textExtraction: {
        // Para colunas numéricas com vírgula (ex: "R$ 1.234,56")
        '.ts-num': function (node) {
            return jQuery(node).text()
                .replace(/[^0-9,]+/g, '') // Remove tudo que não for número ou vírgula
                .replace(',', '.');       // Troca vírgula por ponto para usar como número decimal
        },

        // Para colunas de data no formato personalizado
        '.ts-data': function (node) {
            return dateFormat(jQuery(node).text(), 'n'); // 'n' pode significar formato numérico
        },

        // Mesma função acima, pode ser usada para outro tipo de data
        '.ts-data2': function (node) {
            return dateFormat(jQuery(node).text(), 'n');
        },

        // Para data e hora juntas
        '.ts-datahora': function (node) {
            return dateFormat(jQuery(node).text(), 'n', '', true); // O "true" provavelmente ativa parsing de hora
		}
    },

    // Define regras para colunas específicas
    headers: {
        // Colunas com a classe .ts-norder não podem ser ordenadas
        '.ts-norder': { sorter: false }
    },

    // Opções específicas para os widgets ativados (principalmente stickyHeaders)
    widgetOptions: {
        // Classe CSS extra para o cabeçalho fixo (não definida)
        stickyHeaders: '',

        // Espaçamento extra no topo (ajustar se houver navbar fixa)
        stickyHeaders_offset: 0,

        // Sufixo para o ID do cabeçalho clonado
        stickyHeaders_cloneId: '-sticky',

        // Recalcula tamanhos dos cabeçalhos ao redimensionar a janela
        stickyHeaders_addResizeEvent: true,

        // Inclui a tag <caption> no cabeçalho fixo, se presente
        stickyHeaders_includeCaption: true,

        // Z-index do cabeçalho fixo (controla sobreposição)
        stickyHeaders_zIndex: 2,

        // Alvo customizado para anexar o cabeçalho fixo (null = usa padrão)
        stickyHeaders_attachTo: null,

        // Elemento que será usado para monitorar scroll horizontal
        stickyHeaders_xScroll: null,

        // Elemento que será usado para monitorar scroll vertical
        stickyHeaders_yScroll: null,

        // Após aplicar filtros, volta a tabela para o topo visível
        stickyHeaders_filteredToTop: true
    }
};

// Aplica o TableSorter a todas as tabelas com a classe .tablesorter
jQuery(function () {
    jQuery('.tablesorter').tablesorter(tableSorterOptions);
});
