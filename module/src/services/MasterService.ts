import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { MasterError } from "../dto/MasterError";
import { CONSTANTS } from "../constants";
import { AddMasterData } from "../dto/AddMasterData";

export abstract class MasterService {
  protected constructor(protected readonly logger: PinoLogger) {}

  public async storeData(
    key: string,
    body: AddMasterData
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/masterdata/create",body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new MasterError(`Error occurred. ${e}`, "Master.error");
    }
  }

  public async getData(
    id: string,
    key: string,
    data: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(CONSTANTS.VTraceApi + "/masterdata/id", {
        headers: { "x-access-token": key },
      });
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new MasterError(`Error occurred ${e}`, "Master.error");
    }
  }

  public async getMasterData(
    key: string,
    data: any,
    id: string
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/masterdata/getMasterData",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new MasterError(`Error occurred ${e}`, "Master.error");
    }
  }

  public async updateData(
    key: string,
    body: AddMasterData
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/masterdata/update",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new MasterError(`Error occurred. ${e}`, "Master.error");
    }
  }

  public async insertBatchData(
    key: string,
    body: AddMasterData
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/masterdata/insert/batch",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new MasterError(`Error occurred. ${e}`, "Master.error");
    }
  }

  public async deleteData(key: string, body:any): Promise<{ data: string }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/masterdata/delete",{
          data: body,
          headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      // this.logger.error(e);
      console.log('error here')
      throw new MasterError(`Error occurred. ${e}`, "Master.error");
    }
  }
}
