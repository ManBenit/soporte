import Modal from '@/components/ModalE.vue';

export default {
    components: {
        Modal
    },
    data() {
        return {
            showModal: false,
            loadingApiNube: false,
            loadingMtServices: false,
            apiResponse: {
                title: '',
                qa: [],  // Para QA
                prod: [] // Para PROD
            },
            modalContent: {
                title: '',
                bodyProd: {},
                bodyQa: {}
            }
        };
    },
    methods: {
        
        async callApiNubeService() {
            this.apiResponse.title = 'Servicios de Api Nube';
            this.loadingApiNube = true;
            try {
                const response = await fetch('http://localhost:8080/api/roaming/consultar-servicios');
                const data = await response.json();
                this.apiResponse.qa = data.QA.map(service => ({
                    titulo: service.serviceName,
                    status: service.statusCode === 200,
                    body: service.body,
                }));
                this.apiResponse.prod = data.PROD.map(service => ({
                    titulo: service.serviceName,
                    status: service.statusCode === 200,
                    body: service.body,
                }));
            } catch (error) {
                this.apiResponse.qa = [{
                    titulo: 'Error',
                    status: false,
                    body: error.message,
                }];
                this.apiResponse.prod = [{
                    titulo: 'Error',
                    status: false,
                    body: error.message,
                }];
            }
            this.loadingApiNube = false;
        },

        callMTService() {
            this.apiResponse.title = 'Servicios de MiTelcel';
            this.loadingMtServices = true;
            this.apiResponse.qa = [
                {
                    titulo: 'Servicio MiTelcel QA 1',
                    status: true,
                    body: { /* contenido del servicio */ }
                },
                {
                    titulo: 'Servicio MiTelcel QA 2',
                    status: false,
                    body: 'Error en el servicio MiTelcel QA 2'
                }
            ];
            this.apiResponse.prod = [
                {
                    titulo: 'Servicio MiTelcel PROD 1',
                    status: true,
                    body: { /* contenido del servicio */ }
                },
                {
                    titulo: 'Servicio MiTelcel PROD 2',
                    status: false,
                    body: 'Error en el servicio MiTelcel PROD 2'
                }
            ];
            this.loadingMtServices = false;
        },

        compareJson(title, bodyProd, bodyQa){
            this.showModal = true;
            this.modalContent.title = title;
            this.modalContent.bodyProd = bodyProd;
            this.modalContent.bodyQa = bodyQa;
        },

        extractErrorMessage(body) {
            const code = body.match(/\d{3}\s\w+\s\w+/);
            const desc = body.match(/El requerimiento enviado por el cliente era sintácticamente incorrecto\./);
            if (code && desc) {
                return code[0] + ": " + desc[0];
            } else {
                return 'Error al obtener el código de respuesta';
            }
        },

        syncTextareaScroll(sourceRef, targetRef){
            const source = this.$refs[sourceRef];
            const target = this.$refs[targetRef];
            if (source && target) {
                target.scrollTop = source.scrollTop;
            }
        }

    }
};