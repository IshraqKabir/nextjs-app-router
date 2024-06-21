interface Equipment {
  _id: string;
  name: string;
}

interface Creator {
  _id: string;
  name: string;
  email: string;
}

interface ComponentRecord {
  _id: string;
  type: string;
  title: string;
  units: string;
  status: string;
  asset_id: string;
  description: string;
  component_id: string;
  triggers_by_id: Record<string, string>;
  should_calculate_average: boolean;
}

interface Reading {
  range: Record<string, string>;
  equipment: Array<Equipment>;
  description: string;
  readingType: string;
  component_record: ComponentRecord;
}

interface Field {
  action_type: string;
  reading: Reading;
}

interface Section {
  name: string;
  field: Array<Field>;
}

export interface WorkOrder {
  id: string;
  data: {
    _id: string;
    title: string;
    status: string;
    creator: Creator;
    tag_ids: string[];
    asset_id: string;
    file_ids: string[];
    sections: Array<Section>;
  };
}
