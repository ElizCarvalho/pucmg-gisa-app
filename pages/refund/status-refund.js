import { Chip } from "@mui/material"
import StatusNameRefundEnum from "../../enums/statusNameRefundEnum"
import StatusRefundEnum from "../../enums/statusRefundEnum"


export default function StatusRefund(statusRefund){

    const getStatusColor = (statusRefund) => {
        switch(statusRefund){
            case StatusRefundEnum.NOVO:
                return 'primary'
            case StatusRefundEnum.EM_ANALISE:
                return 'warning'
            case StatusRefundEnum.AGUARDANDO_PAGAMENTO:
                return 'info'
            case StatusRefundEnum.PAGAMENTO_REALIZADO:
                return 'success'
            case StatusRefundEnum.INDEFERIDO:
                return 'error'
        }
    }

    const getStatusName = (statusRefund) => {
        switch(statusRefund){
            case StatusRefundEnum.NOVO:
                return StatusNameRefundEnum.NOVO
            case StatusRefundEnum.EM_ANALISE:
                return StatusNameRefundEnum.EM_ANALISE
            case StatusRefundEnum.AGUARDANDO_PAGAMENTO:
                return StatusNameRefundEnum.AGUARDANDO_PAGAMENTO
            case StatusRefundEnum.PAGAMENTO_REALIZADO:
                return StatusNameRefundEnum.PAGAMENTO_REALIZADO
            case StatusRefundEnum.INDEFERIDO:
                return StatusNameRefundEnum.INDEFERIDO
        }
    }

    return (
        <>
            <Chip color={getStatusColor(statusRefund.statusRefund)} label={getStatusName(statusRefund.statusRefund)} />
        </>
    )
}